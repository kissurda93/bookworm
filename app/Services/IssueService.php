<?php

namespace App\Services;

use App\Exceptions\IssueException;
use App\Models\Book;
use App\Models\User;
use App\Models\Issue;
use Illuminate\Support\Facades\DB;

class IssueService
{
  public function createIssue(User $user, Book $book, array $validated)
  {
    if($book->stock <= 0) {
      throw new IssueException('Out of stock!');
    }

    if($this->checkBookAlreadyRequested($user, $book)) {
      throw new IssueException('You have already requested the book!');
    }


    DB::transaction(function () use ($user, $book, $validated) {
      $issue = Issue::create([
        'user_id' => $user->id,
        'book_id' => $book->id,
        'request_date' => date('Y-m-d'),
        'expire_date' => $this->calculateExpireDate($validated['month']),
      ]);

      $book->stock -= 1;
      $book->save();

      $user->issues()->save($issue);
      $book->issues()->save($issue);
    });
  }

  public function updateIssue(Issue $issue, array $validated): Issue
  {
    foreach ($validated as $key => $value) {
      $issue[$key] = $value;
    }

    $issue->save();
    return $issue;
  }

  private function calculateExpireDate(int $month): string
  {
    $currentDate = date('Y-m-d');

    $array = explode('-', $currentDate);
    $array[1] = $array[1] + $month;
    $expireDate = implode('-', $array);

    return $expireDate;
  }

  private function checkBookAlreadyRequested(User $user, Book $book): bool
  {
    $exist = false;

    foreach ($user->issues as $issue) {
      if($issue->book->title == $book->title) {
        $exist = true;
        break;
      }
    }

    return $exist;
  }
}
